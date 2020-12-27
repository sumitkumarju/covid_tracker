import axios from "axios";
import moment from 'moment';

export const fetchData = async (state) => {
 
  if(state)
  {
    try {
            function renameKeys(obj, newKeys) {
                const keyValues = Object.keys(obj).map(key => {
                    const newKey = newKeys[key] || key;
                    return { [newKey]: obj[key] };
                });
                return Object.assign({}, ...keyValues);
            }  

        const {data} = await axios.get("https://api.covid19india.org/v4/data.json");
        const {total,meta:{last_updated}} = data[state];
        total['dateymd']=last_updated;
        const newKeys = { confirmed:"totalconfirmed",recovered:"totalrecovered",deceased:"totaldeceased"};
        const modifiedData = renameKeys(total, newKeys);
        return modifiedData;

      } catch (error) {
        console.log(error);
    }
    
  }
  else
  {
    try {
        const {
          data: { cases_time_series },
        } = await axios.get(`https://api.covid19india.org/data.json`);
    
        const {totalconfirmed,totalrecovered,totaldeceased,dateymd} = cases_time_series.slice(-1).pop();
        return {totalconfirmed,totalrecovered,totaldeceased,dateymd};
      } catch (error) {
        console.log(error);
      }
  }
  
};

export const fetchDailyData = async (state) => {
  state=state.toLowerCase();
  if(state)
  {
    const {data:{states_daily}} = await axios.get(`https://api.covid19india.org/states_daily.json`);
    var newArray = states_daily.filter(d => d.status === "Confirmed" );
    const confirmed = newArray.map( d=> d[state]);
    newArray = states_daily.filter(d => d.status === "Recovered" );
    const recovered = newArray.map( d=> d[state]);
    newArray = states_daily.filter(d => d.status === "Deceased" );
    const deaths = newArray.map( d=> d[state]);                      
    const date = newArray.map( d=> d.dateymd);
    const modifiedData = [];
    var i;
    for (i = 0; i < date.length; i++) {
        modifiedData.push({
            confirmed:confirmed[i],
            deaths: deaths[i],
            recovered: recovered[i],
            date: date[i]
        });
    }
    return modifiedData;
  }  
  else
  {

    try {
        const {
          data: { cases_time_series },
        } = await axios.get(`https://api.covid19india.org/data.json`);
    
        const modifiedData = cases_time_series.map((dailyData) => ({
          confirmed: dailyData.dailyconfirmed,
          deaths: dailyData.dailydeceased,
          recovered: dailyData.dailyrecovered,
          date: dailyData.dateymd,
        }));
        return modifiedData;
      } catch (error) {
        console.log(error);
    }

  }
  
};

export const fetchCountries = async () => {
  try {
    const {
      data: { state_meta_data },
    } = await axios.get(`https://api.covid19india.org/misc.json`);
    return state_meta_data.map((state) => ({
        abbreviation:state.abbreviation,
        stateut:state.stateut,
    }));
  } catch (error) {
    console.log(error);
  }
};


export const fetchDelta = async (state) => {
  
  let response;
  if(state)
  {
    try
    {
        var now = moment().subtract(1, 'day').format('YYYY-MM-DD');
        response = await axios.get(`https://api.covid19india.org/v4/data-${now}.json`);
    }catch(e){
        now = moment().subtract(2, 'day').format('YYYY-MM-DD');
        response = await axios.get(`https://api.covid19india.org/v4/data-${now}.json`);
    }
    const {data} = response;
    const {delta} = data[state];
    
    return delta;

  }
  else
  {
    try
    {
        now = moment().subtract(1, 'day').format('YYYY-MM-DD');
        response = await axios.get(`https://api.covid19india.org/v4/data-${now}.json`);
    }catch(e){
        now = moment().subtract(2, 'day').format('YYYY-MM-DD');
        response = await axios.get(`https://api.covid19india.org/v4/data-${now}.json`);
    }
    const {data} = response;
    const {delta} = data["TT"];
    
    return delta;
  }
  
};
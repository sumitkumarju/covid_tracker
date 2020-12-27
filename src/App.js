import React from "react";
import { Header,Cards, Charts, CountryPicker, Footer} from "./components";
import styles from "./App.module.css";
import { fetchData,fetchDelta } from "./api/";

class App extends React.Component {
  
  state ={
      data: {},
      country: '',
      delta: {},

  }  

  async componentDidMount() {
    const data = await fetchData();
    const delta =  await fetchDelta('');
    this.setState({ data: data  , country: '',delta:delta});  
     
  }

  handleCountryChange = async (country) => {
        
        const data = await fetchData(country);
        const delta =  await fetchDelta(country);
        this.setState({ data: data , country: country,delta:delta}); 
   
    //fetch the data
      //set the state
  }

  render() {
    const { data, country, delta} = this.state;  
    return (
      <div className={styles.container}>
        <Header/>
        <Cards data={data}  country= {country} delta={delta}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Charts data={data} country= {country}/>
        <Footer/>
      </div>
    );
  }
}

export default App;

import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import cx from 'classnames';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


function Cards({ data: {totalconfirmed,totalrecovered,totaldeceased,dateymd},country,delta: {confirmed,deceased,other,recovered,tested} }) {
  if (!totalconfirmed) {
    return "Loading";
  }

  console.log(confirmed,deceased,recovered);  
  return (
    <div className={styles.container}>
      <Grid container spacing={4} justify="center">
        <Grid item component={Card} xs={12} md={2} className={cx(styles.card,styles.infected)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={Number(totalconfirmed)}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography className={styles.counterConfirmed}>
              {confirmed}
              <ArrowUpwardIcon fontSize="small"/>
            </Typography>
            <Typography color="textSecondary">
              {new Date(dateymd).toDateString()}
            </Typography>
            <Typography variant="body2">No. of Active Cases</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={2} className={cx(styles.card,styles.recovered)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
            <CountUp
                start={0}
                end={Number(totalrecovered)}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography className={styles.counterRecovered}>
              {recovered}
              <ArrowUpwardIcon fontSize="small"/>
            </Typography>
            <Typography color="textSecondary">{new Date(dateymd).toDateString()}</Typography>
            <Typography variant="body2">No. of Recovered Cases</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={2} className={cx(styles.card,styles.deaths)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
            <CountUp
                start={0}
                end={Number(totaldeceased)}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography className={styles.counterDeath}>
              {deceased}
              <ArrowUpwardIcon fontSize="small"/>
            </Typography>
            <Typography color="textSecondary">{new Date(dateymd).toDateString()}</Typography>
            <Typography variant="body2">No. of Death Cases</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={2} className={cx(styles.card,styles.tested)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Tested
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={Number(tested)}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(dateymd).toDateString()}
            </Typography>
            <Typography variant="body2">No. of Tests done today </Typography>
            
          </CardContent>
        </Grid>

      </Grid>
    </div>
  );
}

export default Cards;

import classes from "./CountsStats.module.css";

interface IProps {
  counts1: number;
  counts1Label:string;
  counts2: number;
  counts2Label:string;
};

const GoodBadStats = (props: IProps) =>{
  const { counts1, counts1Label, counts2, counts2Label } = props;
  return (
    <div className={classes.statsBox}>
      <div className={`${classes.statCard} ${classes.goodCard}`}>
        <div className={classes.count}>{counts1}</div>
        <div className={classes.label}>{counts1Label}</div>
      </div>
      <div className={`${classes.statCard} ${classes.badCard}`}>
        <div className={classes.count}>{counts2}</div>
        <div className={classes.label}>{counts2Label}</div>
      </div>
    </div>
  );
}

export default GoodBadStats

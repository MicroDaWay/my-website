import classes from './styles.module.css'

const Line = (props) => {
  return (
    <div className={classes.line}>
      <h3 className={classes.title}>{props.title}</h3>
    </div>
  )
}

export default Line

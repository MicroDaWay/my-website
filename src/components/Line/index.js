import classes from './styles.module.css'

const Line = (props) => {
  return (
    <div>
      <h3 className={classes.title}>{props.title}</h3>
      <hr />
    </div>
  )
}

export default Line

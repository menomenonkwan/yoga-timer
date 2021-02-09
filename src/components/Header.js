const Header = (props) => {
  return (
    <header>
      <h1 onClick={props.onClick}>Yoga Timer</h1>
    </header>
  );
}

export default Header;
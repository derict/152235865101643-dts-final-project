import Footerbar from './component/Footerbar';
import Navigationbar from './component/Navigationbar';
import Home from './container/Home';

const App = () => {
  return (
    <>
      <Navigationbar />
      <div className='page-wrapper'>
        <Home />
        <Footerbar />
      </div>
    </>
  );
}

export default App;

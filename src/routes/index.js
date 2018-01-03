/**
 * Created by 0easy-23 on 2017/9/1.
 * 路由配置（方便本地打包，使用了HashRouter）;
 * tips:开发环境下面使用了browserHistory，打包上线的时候需要服务器进行配置;
 */
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Search from '../pages/Search';
import MovieSearch from '../pages/Search/MovieSearch';
import Movie from '../pages/Movie';
import Filmmaker from '../pages/Filmmaker';
import Rank from '../pages/Rank';

//import NotFound from '../components/common/NotFound';

const Routes = () => (
  <div className="app">
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/search-movie" component={MovieSearch} />
        <Route path="/movie" component={Movie} />
        <Route path="/filmmaker" component={Filmmaker} />
        <Route path="/rank" component={Rank} />

        {/* <Route path='/404' component={NotFound} /> */}
        {/* <Redirect from='*' to='/404' /> */}
      </Switch>
    </Router>
  </div>
);

export default Routes;

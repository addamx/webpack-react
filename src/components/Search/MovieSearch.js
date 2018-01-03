import React from 'react'
import { Link } from 'react-router-dom'
import { SearchBar, Pagination, Icon } from 'antd-mobile'
import { getQueryKeys, debounce } from '../../util/func'
import Movie from '../common/Movie'


export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.location.search ? getQueryKeys(this.props.location.search, 'q', 'tag') : '',
      currentPage: 1
    }
    this.onChange = this.onChange.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.fetchResult = this.fetchResult.bind(this)
    this.getPages = this.getPages.bind(this)
    this.fetchResult = debounce(500, this.fetchResult)
  }

  componentDidMount() {
    this.props.SearchResult.total || this.fetchResult()
  }

  fetchResult() {
    this.props.searchActions.searchMovie(this.state.value)
  }

  onChange(value) {
    this.setState({ value })
    this.fetchResult()
    this.setState({ currentPage: 1 })
  }

  onPageChange(page) {
    this.props.searchActions.searchMovie(this.state.value + '&start=' + (page - 1) * this.props.SearchResult.count)
    this.setState({ currentPage: page })
  }

  getPages() {
    const pages = Math.ceil(this.props.SearchResult.total / this.props.SearchResult.count)
    return pages ? pages : 0
  }

  render() {
    if (this.props.SearchResult.length !== 0) {
      const pages = this.getPages();
      return (
        <div className={'page movie-search-page no-footer' + (this.props.Loading ? ' empty' : '')}>
          <div className="searchbar-wrap">
            <SearchBar placeholder="Search"
              showCancelButton
              value={this.state.value}
              onChange={this.onChange}
              onCancel={() => this.props.history.push('/')}
              placeholder="搜索"
            />
          </div>
          <div className="page-row movies-container">
            <h5>共{this.props.SearchResult.total}个电影</h5>
            <ul className="movie-list">
              {
                this.props.SearchResult.subjects.map((el, index) => (
                  <li key={el.id}>
                    <Movie {...el} />
                  </li>
                ))
              }
            </ul>
            <div className="pagination-wrap"><Pagination
              total={pages}
              className="custom-pagination-with-icon"
              current={this.state.currentPage}
              locale={{
                prevText: (<span className="arrow-align"><Icon type="left" />上一页</span>),
                nextText: (<span className="arrow-align">下一页<Icon type="right" /></span>),
              }}
              onChange = {this.onPageChange}
            /></div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="page movie-search-page empty">
          <div className="searchbar-wrap"><SearchBar placeholder="Search"
            showCancelButton
            value={this.state.value}
            onChange={this.onChange}
          /></div>
          <div className="page-loading"><Icon type="loading" size="lg" /></div>
        </div>
      )
    }
  }
}

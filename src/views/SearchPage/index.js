/**
 * Created by nimdanoob on 2017/1/3.
 */
import {Row, Col} from 'antd';
import {Input} from 'antd';
import React, {Component} from 'react';
import './SearchPage.less'
import logo from './assets/site_logo.png'

export class SearchPage extends Component {

  render() {
    return (
      <div className="search_page">
        <div style={{background: 'url(' + logo + ')'}} id="logo"/>
        <Input placeholder="搜索商品" id="search_input"/>
      </div>
    )
  }
}

export default SearchPage

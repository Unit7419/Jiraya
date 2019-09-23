import * as React from 'react'
import {RouteComponentProps} from 'react-router'

interface ITestProps extends RouteComponentProps<any> {
  store: any
}

export default class TestPage extends React.Component<ITestProps, any> {
  constructor(props: ITestProps) {
    super(props)
    this.state = {
      title: '测试页面',
    }
  }

  say() {
    console.log('hello')
  }

  render() {
    return <div className="test-layout">11111</div>
  }
}

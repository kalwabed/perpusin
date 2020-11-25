import { Col, Link, Page, Row, Spacer, User } from '@geist-ui/react'
import { Link as ReactLink } from 'react-router-dom'

import logo from '../logo.svg'

const Layout = ({ children }) => {
  document.title = 'Perpusin'
  return (
    <Page>
      <Page.Header>
        <Row align="middle">
          <Col span={5}>
            <img src={logo} className="App-logo" alt="logo" />
          </Col>
          <Col>
            <ReactLink to="/">
              <Link block>Home</Link>
            </ReactLink>
            <Spacer inline x={1} />
            <ReactLink to="/about">
              <Link block>About</Link>
            </ReactLink>
          </Col>
          <Col span={5}>
            <User src={logo} name="Kalwabed Rizki" />
          </Col>
        </Row>
      </Page.Header>
      <Page.Body>{children}</Page.Body>
    </Page>
  )
}

export default Layout

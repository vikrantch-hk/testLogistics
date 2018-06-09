import './header.scss';

import * as React from 'react';

import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { getLoginUrl } from 'app/shared/util/url-utils';
import appConfig from 'app/config/constants';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
}

export interface IHeaderState {
  menuOpen: boolean;
}

const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="static/images/logo-jhipster-react.svg" alt="Logo" />
  </div>
);

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false
  };

  renderDevRibbon = () =>
    this.props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">Development</a>
      </div>
    ) : null;

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const { isAuthenticated, isAdmin } = this.props;
    const entityMenuItems = [
      <DropdownItem tag={Link} key="vendor" to="/entity/vendor">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Vendor
      </DropdownItem>,
      <DropdownItem tag={Link} key="region-type" to="/entity/region-type">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Region Type
      </DropdownItem>,
      <DropdownItem tag={Link} key="courier-channel" to="/entity/courier-channel">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Courier Channel
      </DropdownItem>,
      <DropdownItem tag={Link} key="courier-group" to="/entity/courier-group">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Courier Group
      </DropdownItem>,
      <DropdownItem tag={Link} key="warehouse" to="/entity/warehouse">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Warehouse
      </DropdownItem>,
      <DropdownItem tag={Link} key="courier" to="/entity/courier">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Courier
      </DropdownItem>,
      <DropdownItem tag={Link} key="pincode" to="/entity/pincode">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Pincode
      </DropdownItem>,
      <DropdownItem tag={Link} key="courier-pricing-engine" to="/entity/courier-pricing-engine">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Courier Pricing Engine
      </DropdownItem>,
      <DropdownItem tag={Link} key="product" to="/entity/product">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Product
      </DropdownItem>,
      <DropdownItem tag={Link} key="product-source-destination-mapping" to="/entity/product-source-destination-mapping">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Product Source Destination Mapping
      </DropdownItem>,
      <DropdownItem tag={Link} key="source-destination-mapping" to="/entity/source-destination-mapping">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Source Destination Mapping
      </DropdownItem>,
      <DropdownItem tag={Link} key="courier-attributes" to="/entity/courier-attributes">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Courier Attributes
      </DropdownItem>,
      <DropdownItem tag={Link} key="vendor-wh-courier-mapping" to="/entity/vendor-wh-courier-mapping">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Vendor Wh Courier Mapping
      </DropdownItem>,
      <DropdownItem tag={Link} key="awb-status" to="/entity/awb-status">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Awb Status
      </DropdownItem>,
      <DropdownItem tag={Link} key="awb" to="/entity/awb">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Awb
      </DropdownItem>,
      <DropdownItem tag={Link} key="city" to="/entity/city">
        <FontAwesomeIcon icon="asterisk" />&nbsp; City
      </DropdownItem>,
      <DropdownItem tag={Link} key="country" to="/entity/country">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Country
      </DropdownItem>,
      <DropdownItem tag={Link} key="state" to="/entity/state">
        <FontAwesomeIcon icon="asterisk" />&nbsp; State
      </DropdownItem>,
      <DropdownItem tag={Link} key="zone" to="/entity/zone">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Zone
      </DropdownItem>,
      <DropdownItem tag={Link} key="hub" to="/entity/hub">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Hub
      </DropdownItem>,
      <DropdownItem tag={Link} key="pincode-courier-mapping" to="/entity/pincode-courier-mapping">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Pincode Courier Mapping
      </DropdownItem>,
      <DropdownItem tag={Link} key="pincode-region-zone" to="/entity/pincode-region-zone">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Pincode Region Zone
      </DropdownItem>,
      /* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */
      <span key="dummy-placeholder" /> /* workaround to avoid error when there are no entities */
    ];
    /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */
    const adminMenuItems = [
      <DropdownItem tag={Link} key="metrics" to="/admin/metrics">
        <FontAwesomeIcon icon="tachometer-alt" /> Metrics
      </DropdownItem>,
      <DropdownItem tag={Link} key="health" to="/admin/health">
        <FontAwesomeIcon icon="heart" /> Health
      </DropdownItem>,
      <DropdownItem tag={Link} key="configuration" to="/admin/configuration">
        <FontAwesomeIcon icon="list" /> Configuration
      </DropdownItem>,
      <DropdownItem tag={Link} key="audits" to="/admin/audits">
        <FontAwesomeIcon icon="bell" /> Audits
      </DropdownItem>,
      /* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */
      <DropdownItem tag={Link} key="logs" to="/admin/logs">
        <FontAwesomeIcon icon="tasks" /> Logs
      </DropdownItem>
    ];

    const swaggerItem = (
      <DropdownItem tag={Link} key="docs" to="/admin/docs">
        <FontAwesomeIcon icon="book" /> API Docs
      </DropdownItem>
    );

    const databaseItem = [
      <DropdownItem tag="a" key="h2-console" href="./h2-console" target="_tab">
        <FontAwesomeIcon icon="hdd" /> Database
      </DropdownItem>
    ];

    const accountMenuItems = [];
    if (isAuthenticated) {
      accountMenuItems.push(
        <DropdownItem tag={Link} key="logout" to="/logout">
          <FontAwesomeIcon icon="sign-out-alt" /> Logout
        </DropdownItem>
      );
    } else {
      accountMenuItems.push(
        <DropdownItem tag="a" key="login" href={getLoginUrl()}>
          <FontAwesomeIcon icon="sign-in-alt" /> Login
        </DropdownItem>
      );
    }

    const entitiesMenu = (
      <UncontrolledDropdown nav inNavbar key="entities">
        <DropdownToggle nav caret className="d-flex align-items-center">
          <FontAwesomeIcon icon="th-list" />
          <span>Entities</span>
        </DropdownToggle>
        <DropdownMenu right>{entityMenuItems}</DropdownMenu>
      </UncontrolledDropdown>
    );
    const adminMenu = (
      <UncontrolledDropdown nav inNavbar key="admin">
        <DropdownToggle nav caret className="d-flex align-items-center">
          <FontAwesomeIcon icon="user-plus" />
          <span>Administration</span>
        </DropdownToggle>
        <DropdownMenu right style={{ width: '130%' }}>
          {adminMenuItems}
          {this.props.isSwaggerEnabled ? swaggerItem : null}

          {!this.props.isInProduction ? databaseItem : null}
        </DropdownMenu>
      </UncontrolledDropdown>
    );

    return (
      <div id="app-header">
        {this.renderDevRibbon()}
        <LoadingBar className="loading-bar" />
        <Navbar dark expand="sm" fixed="top" className="jh-navbar">
          <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
          <NavbarBrand tag={Link} to="/" className="brand-logo">
            <BrandIcon />
            <span className="brand-title">TestLogistics</span>
            <span className="navbar-version">{appConfig.VERSION}</span>
          </NavbarBrand>
          <Collapse isOpen={this.state.menuOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/" className="d-flex align-items-center">
                  <FontAwesomeIcon icon="home" />
                  <span>Home</span>
                </NavLink>
              </NavItem>
              {isAuthenticated ? (isAdmin ? [entitiesMenu, adminMenu] : entitiesMenu) : null}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="d-flex align-items-center">
                  <FontAwesomeIcon icon="user" />
                  <span>Account</span>
                </DropdownToggle>
                <DropdownMenu right>{accountMenuItems}</DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

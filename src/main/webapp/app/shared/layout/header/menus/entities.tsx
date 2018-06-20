import * as React from 'react';
import { DropdownItem } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/vendor">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Vendor
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/region-type">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Region Type
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/courier-channel">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Courier Channel
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/courier-group">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Courier Group
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/warehouse">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Warehouse
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/courier">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Courier
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/pincode">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Pincode
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/courier-pricing-engine">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Courier Pricing Engine
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/product">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Product
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/product-source-destination-mapping">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Product Source Destination Mapping
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/source-destination-mapping">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Source Destination Mapping
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/courier-attributes">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Courier Attributes
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/vendor-wh-courier-mapping">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Vendor Wh Courier Mapping
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/awb-status">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Awb Status
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/awb">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Awb
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/city">
      <FontAwesomeIcon icon="asterisk" />&nbsp; City
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/country">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Country
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/state">
      <FontAwesomeIcon icon="asterisk" />&nbsp; State
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/zone">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Zone
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/hub">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Hub
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/pincode-courier-mapping">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Pincode Courier Mapping
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/pincode-region-zone">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Pincode Region Zone
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);

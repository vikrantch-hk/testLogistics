import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './vendor.reducer';
import { IVendor } from 'app/shared/model/vendor.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVendorDetailProps {
  getEntity: ICrudGetAction<IVendor>;
  vendor: IVendor;
  match: any;
}

export class VendorDetail extends React.Component<IVendorDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { vendor } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Vendor [<b>{vendor.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="name">Name</span>
              </dt>
              <dd>{vendor.name}</dd>
              <dt>
                <span id="shortCode">Short Code</span>
              </dt>
              <dd>{vendor.shortCode}</dd>
              <dt>
                <span id="tinNo">Tin No</span>
              </dt>
              <dd>{vendor.tinNo}</dd>
              <dt>
                <span id="creditDays">Credit Days</span>
              </dt>
              <dd>{vendor.creditDays}</dd>
              <dt>
                <span id="createDt">Create Dt</span>
              </dt>
              <dd>
                <TextFormat value={vendor.createDt} type="date" format={APP_LOCAL_DATE_FORMAT} />
              </dd>
              <dt>
                <span id="email">Email</span>
              </dt>
              <dd>{vendor.email}</dd>
              <dt>
                <span id="addressId">Address Id</span>
              </dt>
              <dd>{vendor.addressId}</dd>
              <dt>
                <span id="billingAddressId">Billing Address Id</span>
              </dt>
              <dd>{vendor.billingAddressId}</dd>
              <dt>
                <span id="active">Active</span>
              </dt>
              <dd>{vendor.active ? 'true' : 'false'}</dd>
              <dt>
                <span id="gstin">Gstin</span>
              </dt>
              <dd>{vendor.gstin}</dd>
              <dt>
                <span id="pincode">Pincode</span>
              </dt>
              <dd>{vendor.pincode}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/vendor" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/vendor/${vendor.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ vendor }) => ({
  vendor: vendor.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(VendorDetail);

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
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

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './vendor-wh-courier-mapping.reducer';
import { IVendorWHCourierMapping } from 'app/shared/model/vendor-wh-courier-mapping.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVendorWHCourierMappingDetailProps {
  getEntity: ICrudGetAction<IVendorWHCourierMapping>;
  vendorWHCourierMapping: IVendorWHCourierMapping;
  match: any;
}

export class VendorWHCourierMappingDetail extends React.Component<IVendorWHCourierMappingDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { vendorWHCourierMapping } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            VendorWHCourierMapping [<b>{vendorWHCourierMapping.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="active">Active</span>
              </dt>
              <dd>{vendorWHCourierMapping.active ? 'true' : 'false'}</dd>
              <dt>Vendor</dt>
              <dd>{vendorWHCourierMapping.vendorName ? vendorWHCourierMapping.vendorName : ''}</dd>
              <dt>Warehouse</dt>
              <dd>{vendorWHCourierMapping.warehouseName ? vendorWHCourierMapping.warehouseName : ''}</dd>
              <dt>Courier Channel</dt>
              <dd>{vendorWHCourierMapping.courierChannelName ? vendorWHCourierMapping.courierChannelName : ''}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/vendor-wh-courier-mapping" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/vendor-wh-courier-mapping/${vendorWHCourierMapping.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ vendorWHCourierMapping }) => ({
  vendorWHCourierMapping: vendorWHCourierMapping.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(VendorWHCourierMappingDetail);

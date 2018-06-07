import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './pincode-courier-mapping.reducer';
import { IPincodeCourierMapping } from 'app/shared/model/pincode-courier-mapping.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPincodeCourierMappingDetailProps {
  getEntity: ICrudGetAction<IPincodeCourierMapping>;
  pincodeCourierMapping: IPincodeCourierMapping;
  match: any;
}

export class PincodeCourierMappingDetail extends React.Component<IPincodeCourierMappingDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pincodeCourierMapping } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            PincodeCourierMapping [<b>{pincodeCourierMapping.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="routingCode">Routing Code</span>
              </dt>
              <dd>{pincodeCourierMapping.routingCode}</dd>
              <dt>
                <span id="applicableForCheapestCourier">Applicable For Cheapest Courier</span>
              </dt>
              <dd>{pincodeCourierMapping.applicableForCheapestCourier ? 'true' : 'false'}</dd>
              <dt>
                <span id="estimatedDeliveryDays">Estimated Delivery Days</span>
              </dt>
              <dd>{pincodeCourierMapping.estimatedDeliveryDays}</dd>
              <dt>
                <span id="pickupAvailable">Pickup Available</span>
              </dt>
              <dd>{pincodeCourierMapping.pickupAvailable ? 'true' : 'false'}</dd>
              <dt>Pincode</dt>
              <dd>{pincodeCourierMapping.pincodeId ? pincodeCourierMapping.pincodeId : ''}</dd>
              <dt>Attributes</dt>
              <dd>{pincodeCourierMapping.attributesId ? pincodeCourierMapping.attributesId : ''}</dd>
              <dt>Product Group</dt>
              <dd>{pincodeCourierMapping.productGroupName ? pincodeCourierMapping.productGroupName : ''}</dd>
              <dt>Vendor WH Courier Mapping</dt>
              <dd>{pincodeCourierMapping.vendorWHCourierMappingId ? pincodeCourierMapping.vendorWHCourierMappingId : ''}</dd>
              <dt>Source Destination Mapping</dt>
              <dd>{pincodeCourierMapping.sourceDestinationMappingId ? pincodeCourierMapping.sourceDestinationMappingId : ''}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/pincode-courier-mapping" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/pincode-courier-mapping/${pincodeCourierMapping.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ pincodeCourierMapping }) => ({
  pincodeCourierMapping: pincodeCourierMapping.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(PincodeCourierMappingDetail);

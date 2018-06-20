import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pincode-courier-mapping.reducer';
import { IPincodeCourierMapping } from 'app/shared/model/pincode-courier-mapping.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPincodeCourierMappingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class PincodeCourierMappingDetail extends React.Component<IPincodeCourierMappingDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pincodeCourierMappingEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            PincodeCourierMapping [<b>{pincodeCourierMappingEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="routingCode">Routing Code</span>
            </dt>
            <dd>{pincodeCourierMappingEntity.routingCode}</dd>
            <dt>
              <span id="applicableForCheapestCourier">Applicable For Cheapest Courier</span>
            </dt>
            <dd>{pincodeCourierMappingEntity.applicableForCheapestCourier ? 'true' : 'false'}</dd>
            <dt>
              <span id="estimatedDeliveryDays">Estimated Delivery Days</span>
            </dt>
            <dd>{pincodeCourierMappingEntity.estimatedDeliveryDays}</dd>
            <dt>
              <span id="pickupAvailable">Pickup Available</span>
            </dt>
            <dd>{pincodeCourierMappingEntity.pickupAvailable ? 'true' : 'false'}</dd>
            <dt>Pincode</dt>
            <dd>{pincodeCourierMappingEntity.pincodeId ? pincodeCourierMappingEntity.pincodeId : ''}</dd>
            <dt>Attributes</dt>
            <dd>{pincodeCourierMappingEntity.attributesId ? pincodeCourierMappingEntity.attributesId : ''}</dd>
            <dt>Vendor WH Courier Mapping</dt>
            <dd>{pincodeCourierMappingEntity.vendorWHCourierMappingId ? pincodeCourierMappingEntity.vendorWHCourierMappingId : ''}</dd>
            <dt>Source Destination Mapping</dt>
            <dd>{pincodeCourierMappingEntity.sourceDestinationMappingId ? pincodeCourierMappingEntity.sourceDestinationMappingId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/pincode-courier-mapping" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/pincode-courier-mapping/${pincodeCourierMappingEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ pincodeCourierMapping }: IRootState) => ({
  pincodeCourierMappingEntity: pincodeCourierMapping.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PincodeCourierMappingDetail);

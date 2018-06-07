import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './courier-pickup-info.reducer';
import { ICourierPickupInfo } from 'app/shared/model/courier-pickup-info.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICourierPickupInfoDetailProps {
  getEntity: ICrudGetAction<ICourierPickupInfo>;
  courierPickupInfo: ICourierPickupInfo;
  match: any;
}

export class CourierPickupInfoDetail extends React.Component<ICourierPickupInfoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { courierPickupInfo } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            CourierPickupInfo [<b>{courierPickupInfo.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="pickupConfirmationNo">Pickup Confirmation No</span>
              </dt>
              <dd>{courierPickupInfo.pickupConfirmationNo}</dd>
              <dt>
                <span id="trackingNo">Tracking No</span>
              </dt>
              <dd>{courierPickupInfo.trackingNo}</dd>
              <dt>
                <span id="pickupDate">Pickup Date</span>
              </dt>
              <dd>
                <TextFormat value={courierPickupInfo.pickupDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
              </dd>
              <dt>Courier</dt>
              <dd>{courierPickupInfo.courierName ? courierPickupInfo.courierName : ''}</dd>
              <dt>Pickup Status</dt>
              <dd>{courierPickupInfo.pickupStatusName ? courierPickupInfo.pickupStatusName : ''}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/courier-pickup-info" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/courier-pickup-info/${courierPickupInfo.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ courierPickupInfo }) => ({
  courierPickupInfo: courierPickupInfo.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(CourierPickupInfoDetail);

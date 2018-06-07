import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './pickup-status.reducer';
import { IPickupStatus } from 'app/shared/model/pickup-status.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPickupStatusDetailProps {
  getEntity: ICrudGetAction<IPickupStatus>;
  pickupStatus: IPickupStatus;
  match: any;
}

export class PickupStatusDetail extends React.Component<IPickupStatusDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pickupStatus } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            PickupStatus [<b>{pickupStatus.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="name">Name</span>
              </dt>
              <dd>{pickupStatus.name}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/pickup-status" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/pickup-status/${pickupStatus.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ pickupStatus }) => ({
  pickupStatus: pickupStatus.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(PickupStatusDetail);

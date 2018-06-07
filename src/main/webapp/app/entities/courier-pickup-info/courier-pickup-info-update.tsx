import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { ICourier } from 'app/shared/model/courier.model';
import { getEntities as getCouriers } from 'app/entities/courier/courier.reducer';
import { IPickupStatus } from 'app/shared/model/pickup-status.model';
import { getEntities as getPickupStatuses } from 'app/entities/pickup-status/pickup-status.reducer';
import { getEntity, updateEntity, createEntity, reset } from './courier-pickup-info.reducer';
import { ICourierPickupInfo } from 'app/shared/model/courier-pickup-info.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ICourierPickupInfoUpdateProps {
  getEntity: ICrudGetAction<ICourierPickupInfo>;
  updateEntity: ICrudPutAction<ICourierPickupInfo>;
  createEntity: ICrudPutAction<ICourierPickupInfo>;
  getCouriers: ICrudGetAllAction<ICourier>;
  couriers: ICourier[];
  getPickupStatuses: ICrudGetAllAction<IPickupStatus>;
  pickupStatuses: IPickupStatus[];
  courierPickupInfo: ICourierPickupInfo;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface ICourierPickupInfoUpdateState {
  isNew: boolean;
  courierId: number;
  pickupStatusId: number;
}

export class CourierPickupInfoUpdate extends React.Component<ICourierPickupInfoUpdateProps, ICourierPickupInfoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      courierId: 0,
      pickupStatusId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCouriers();
    this.props.getPickupStatuses();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { courierPickupInfo } = this.props;
      const entity = {
        ...courierPickupInfo,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/courier-pickup-info');
  };

  courierUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        courierId: -1
      });
    } else {
      for (const i in this.props.couriers) {
        if (name === this.props.couriers[i].name.toString()) {
          this.setState({
            courierId: this.props.couriers[i].id
          });
        }
      }
    }
  };

  pickupStatusUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        pickupStatusId: -1
      });
    } else {
      for (const i in this.props.pickupStatuses) {
        if (name === this.props.pickupStatuses[i].name.toString()) {
          this.setState({
            pickupStatusId: this.props.pickupStatuses[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { courierPickupInfo, couriers, pickupStatuses, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-courier-pickup-info-heading">Create or edit a CourierPickupInfo</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : courierPickupInfo} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="pickupConfirmationNoLabel" for="pickupConfirmationNo">
                    Pickup Confirmation No
                  </Label>
                  <AvField type="text" name="pickupConfirmationNo" />
                </AvGroup>
                <AvGroup>
                  <Label id="trackingNoLabel" for="trackingNo">
                    Tracking No
                  </Label>
                  <AvField type="text" name="trackingNo" />
                </AvGroup>
                <AvGroup>
                  <Label id="pickupDateLabel" for="pickupDate">
                    Pickup Date
                  </Label>
                  <AvField
                    type="date"
                    className="form-control"
                    name="pickupDate"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="courier.name">Courier</Label>
                  <AvInput type="select" className="form-control" name="courierId" onChange={this.courierUpdate}>
                    <option value="" key="0" />
                    {couriers
                      ? couriers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="pickupStatus.name">Pickup Status</Label>
                  <AvInput type="select" className="form-control" name="pickupStatusId" onChange={this.pickupStatusUpdate}>
                    <option value="" key="0" />
                    {pickupStatuses
                      ? pickupStatuses.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/courier-pickup-info" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />&nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  couriers: storeState.courier.entities,
  pickupStatuses: storeState.pickupStatus.entities,
  courierPickupInfo: storeState.courierPickupInfo.entity,
  loading: storeState.courierPickupInfo.loading,
  updating: storeState.courierPickupInfo.updating
});

const mapDispatchToProps = {
  getCouriers,
  getPickupStatuses,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(CourierPickupInfoUpdate);

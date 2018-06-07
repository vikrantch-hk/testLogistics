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
import { getEntity, updateEntity, createEntity, reset } from './courier-channel.reducer';
import { ICourierChannel } from 'app/shared/model/courier-channel.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ICourierChannelUpdateProps {
  getEntity: ICrudGetAction<ICourierChannel>;
  updateEntity: ICrudPutAction<ICourierChannel>;
  createEntity: ICrudPutAction<ICourierChannel>;
  getCouriers: ICrudGetAllAction<ICourier>;
  couriers: ICourier[];
  courierChannel: ICourierChannel;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface ICourierChannelUpdateState {
  isNew: boolean;
  courierId: number;
}

export class CourierChannelUpdate extends React.Component<ICourierChannelUpdateProps, ICourierChannelUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      courierId: 0,
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { courierChannel } = this.props;
      const entity = {
        ...courierChannel,
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
    this.props.history.push('/entity/courier-channel');
  };

  render() {
    const isInvalid = false;
    const { courierChannel, couriers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-courier-channel-heading">Create or edit a CourierChannel</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : courierChannel} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    Name
                  </Label>
                  <AvField type="text" name="name" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/courier-channel" replace color="info">
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
  courierChannel: storeState.courierChannel.entity,
  loading: storeState.courierChannel.loading,
  updating: storeState.courierChannel.updating
});

const mapDispatchToProps = {
  getCouriers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(CourierChannelUpdate);

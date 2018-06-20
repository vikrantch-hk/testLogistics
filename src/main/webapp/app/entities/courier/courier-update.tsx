import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICourierChannel } from 'app/shared/model/courier-channel.model';
import { getEntities as getCourierChannels } from 'app/entities/courier-channel/courier-channel.reducer';
import { ICourierGroup } from 'app/shared/model/courier-group.model';
import { getEntities as getCourierGroups } from 'app/entities/courier-group/courier-group.reducer';
import { getEntity, updateEntity, createEntity, reset } from './courier.reducer';
import { ICourier } from 'app/shared/model/courier.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ICourierUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ICourierUpdateState {
  isNew: boolean;
  idscourierChannel: any[];
  idscourierGroup: any[];
}

export class CourierUpdate extends React.Component<ICourierUpdateProps, ICourierUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idscourierChannel: [],
      idscourierGroup: [],
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCourierChannels();
    this.props.getCourierGroups();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { courierEntity } = this.props;
      const entity = {
        ...courierEntity,
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
    this.props.history.push('/entity/courier');
  };

  courierChannelUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idscourierChannel: keysToValues(selected, this.props.courierChannels, 'name')
    });
  };

  courierGroupUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idscourierGroup: keysToValues(selected, this.props.courierGroups, 'name')
    });
  };

  displaycourierChannel(value: any) {
    if (this.state.idscourierChannel && this.state.idscourierChannel.length !== 0) {
      const list = [];
      for (const i in this.state.idscourierChannel) {
        if (this.state.idscourierChannel[i]) {
          list.push(this.state.idscourierChannel[i].name);
        }
      }
      return list;
    }
    if (value.courierChannels && value.courierChannels.length !== 0) {
      const list = [];
      for (const i in value.courierChannels) {
        if (value.courierChannels[i]) {
          list.push(value.courierChannels[i].name);
        }
      }
      this.setState({
        idscourierChannel: keysToValues(list, this.props.courierChannels, 'name')
      });
      return list;
    }
    return null;
  }

  displaycourierGroup(value: any) {
    if (this.state.idscourierGroup && this.state.idscourierGroup.length !== 0) {
      const list = [];
      for (const i in this.state.idscourierGroup) {
        if (this.state.idscourierGroup[i]) {
          list.push(this.state.idscourierGroup[i].name);
        }
      }
      return list;
    }
    if (value.courierGroups && value.courierGroups.length !== 0) {
      const list = [];
      for (const i in value.courierGroups) {
        if (value.courierGroups[i]) {
          list.push(value.courierGroups[i].name);
        }
      }
      this.setState({
        idscourierGroup: keysToValues(list, this.props.courierGroups, 'name')
      });
      return list;
    }
    return null;
  }

  render() {
    const isInvalid = false;
    const { courierEntity, courierChannels, courierGroups, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="testLogisticsApp.courier.home.createOrEditLabel">Create or edit a Courier</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : courierEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="courier-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    Name
                  </Label>
                  <AvField
                    id="courier-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="activeLabel" check>
                    <AvInput id="courier-active" type="checkbox" className="form-control" name="active" />
                    Active
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="trackingParameterLabel" for="trackingParameter">
                    Tracking Parameter
                  </Label>
                  <AvField id="courier-trackingParameter" type="text" name="trackingParameter" />
                </AvGroup>
                <AvGroup>
                  <Label id="trackingUrlLabel" for="trackingUrl">
                    Tracking Url
                  </Label>
                  <AvField id="courier-trackingUrl" type="text" name="trackingUrl" />
                </AvGroup>
                <AvGroup>
                  <Label id="parentCourierIdLabel" for="parentCourierId">
                    Parent Courier Id
                  </Label>
                  <AvField id="courier-parentCourierId" type="number" className="form-control" name="parentCourierId" />
                </AvGroup>
                <AvGroup>
                  <Label for="courierChannels">Courier Channel</Label>
                  <AvInput
                    id="courier-courierChannel"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakecourierChannels"
                    value={this.displaycourierChannel(courierEntity)}
                    onChange={this.courierChannelUpdate}
                  >
                    <option value="" key="0" />
                    {courierChannels
                      ? courierChannels.map(otherEntity => (
                          <option value={otherEntity.name} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="courier-courierChannel" type="hidden" name="courierChannels" value={this.state.idscourierChannel} />
                </AvGroup>
                <AvGroup>
                  <Label for="courierGroups">Courier Group</Label>
                  <AvInput
                    id="courier-courierGroup"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakecourierGroups"
                    value={this.displaycourierGroup(courierEntity)}
                    onChange={this.courierGroupUpdate}
                  >
                    <option value="" key="0" />
                    {courierGroups
                      ? courierGroups.map(otherEntity => (
                          <option value={otherEntity.name} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="courier-courierGroup" type="hidden" name="courierGroups" value={this.state.idscourierGroup} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/courier" replace color="info">
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

const mapStateToProps = (storeState: IRootState) => ({
  courierChannels: storeState.courierChannel.entities,
  courierGroups: storeState.courierGroup.entities,
  courierEntity: storeState.courier.entity,
  loading: storeState.courier.loading,
  updating: storeState.courier.updating
});

const mapDispatchToProps = {
  getCourierChannels,
  getCourierGroups,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CourierUpdate);

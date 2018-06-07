import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { ICity } from 'app/shared/model/city.model';
import { getEntities as getCities } from 'app/entities/city/city.reducer';
import { IState } from 'app/shared/model/state.model';
import { getEntities as getStates } from 'app/entities/state/state.reducer';
import { IZone } from 'app/shared/model/zone.model';
import { getEntities as getZones } from 'app/entities/zone/zone.reducer';
import { IHub } from 'app/shared/model/hub.model';
import { getEntities as getHubs } from 'app/entities/hub/hub.reducer';
import { getEntity, updateEntity, createEntity, reset } from './pincode.reducer';
import { IPincode } from 'app/shared/model/pincode.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IPincodeUpdateProps {
  getEntity: ICrudGetAction<IPincode>;
  updateEntity: ICrudPutAction<IPincode>;
  createEntity: ICrudPutAction<IPincode>;
  getCities: ICrudGetAllAction<ICity>;
  cities: ICity[];
  getStates: ICrudGetAllAction<IState>;
  states: IState[];
  getZones: ICrudGetAllAction<IZone>;
  zones: IZone[];
  getHubs: ICrudGetAllAction<IHub>;
  hubs: IHub[];
  pincode: IPincode;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface IPincodeUpdateState {
  isNew: boolean;
  cityId: number;
  stateId: number;
  zoneId: number;
  hubId: number;
}

export class PincodeUpdate extends React.Component<IPincodeUpdateProps, IPincodeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      cityId: 0,
      stateId: 0,
      zoneId: 0,
      hubId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCities();
    this.props.getStates();
    this.props.getZones();
    this.props.getHubs();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { pincode } = this.props;
      const entity = {
        ...pincode,
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
    this.props.history.push('/entity/pincode');
  };

  cityUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        cityId: -1
      });
    } else {
      for (const i in this.props.cities) {
        if (name === this.props.cities[i].name.toString()) {
          this.setState({
            cityId: this.props.cities[i].id
          });
        }
      }
    }
  };

  stateUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        stateId: -1
      });
    } else {
      for (const i in this.props.states) {
        if (name === this.props.states[i].name.toString()) {
          this.setState({
            stateId: this.props.states[i].id
          });
        }
      }
    }
  };

  zoneUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        zoneId: -1
      });
    } else {
      for (const i in this.props.zones) {
        if (name === this.props.zones[i].name.toString()) {
          this.setState({
            zoneId: this.props.zones[i].id
          });
        }
      }
    }
  };

  hubUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        hubId: -1
      });
    } else {
      for (const i in this.props.hubs) {
        if (name === this.props.hubs[i].name.toString()) {
          this.setState({
            hubId: this.props.hubs[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { pincode, cities, states, zones, hubs, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-pincode-heading">Create or edit a Pincode</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : pincode} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="pincodeLabel" for="pincode">
                    Pincode
                  </Label>
                  <AvField
                    type="text"
                    name="pincode"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="regionLabel" for="region">
                    Region
                  </Label>
                  <AvField type="text" name="region" />
                </AvGroup>
                <AvGroup>
                  <Label id="localityLabel" for="locality">
                    Locality
                  </Label>
                  <AvField type="text" name="locality" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastMileCostLabel" for="lastMileCost">
                    Last Mile Cost
                  </Label>
                  <AvField type="number" className="form-control" name="lastMileCost" />
                </AvGroup>
                <AvGroup>
                  <Label id="tierLabel" for="tier">
                    Tier
                  </Label>
                  <AvField type="text" name="tier" />
                </AvGroup>
                <AvGroup>
                  <Label for="city.name">City</Label>
                  <AvInput type="select" className="form-control" name="cityId" onChange={this.cityUpdate}>
                    <option value="" key="0" />
                    {cities
                      ? cities.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="state.name">State</Label>
                  <AvInput type="select" className="form-control" name="stateId" onChange={this.stateUpdate}>
                    <option value="" key="0" />
                    {states
                      ? states.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="zone.name">Zone</Label>
                  <AvInput type="select" className="form-control" name="zoneId" onChange={this.zoneUpdate}>
                    <option value="" key="0" />
                    {zones
                      ? zones.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="hub.name">Hub</Label>
                  <AvInput type="select" className="form-control" name="hubId" onChange={this.hubUpdate}>
                    <option value="" key="0" />
                    {hubs
                      ? hubs.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/pincode" replace color="info">
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
  cities: storeState.city.entities,
  states: storeState.state.entities,
  zones: storeState.zone.entities,
  hubs: storeState.hub.entities,
  pincode: storeState.pincode.entity,
  loading: storeState.pincode.loading,
  updating: storeState.pincode.updating
});

const mapDispatchToProps = {
  getCities,
  getStates,
  getZones,
  getHubs,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(PincodeUpdate);

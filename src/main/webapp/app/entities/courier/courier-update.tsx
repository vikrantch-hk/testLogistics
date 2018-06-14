import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { ICourierGroup } from 'app/shared/model/courier-group.model';
import { getEntities as getCourierGroups } from 'app/entities/courier-group/courier-group.reducer';
import { getEntity, updateEntity, createEntity, reset } from './courier.reducer';
import { ICourier } from 'app/shared/model/courier.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ICourierUpdateProps {
  getEntity: ICrudGetAction<ICourier>;
  updateEntity: ICrudPutAction<ICourier>;
  createEntity: ICrudPutAction<ICourier>;
  getCourierGroups: ICrudGetAllAction<ICourierGroup>;
  courierGroups: ICourierGroup[];
  courier: ICourier;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface ICourierUpdateState {
  isNew: boolean;
  idscourierGroup: any[];
}

export class CourierUpdate extends React.Component<ICourierUpdateProps, ICourierUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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

    this.props.getCourierGroups();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { courier } = this.props;
      const entity = {
        ...courier,
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

  courierGroupUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idscourierGroup: keysToValues(selected, this.props.courierGroups, 'name')
    });
  };

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
    const { courier, courierGroups, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-courier-heading">Create or edit a Courier</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : courier} onSubmit={this.saveEntity}>
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
                  <AvField
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="activeLabel" check>
                    <AvInput type="checkbox" className="form-control" name="active" />
                    Active
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="trackingParameterLabel" for="trackingParameter">
                    Tracking Parameter
                  </Label>
                  <AvField type="text" name="trackingParameter" />
                </AvGroup>
                <AvGroup>
                  <Label id="trackingUrlLabel" for="trackingUrl">
                    Tracking Url
                  </Label>
                  <AvField type="text" name="trackingUrl" />
                </AvGroup>
                <AvGroup>
                  <Label id="parentCourierIdLabel" for="parentCourierId">
                    Parent Courier Id
                  </Label>
                  <AvField type="number" className="form-control" name="parentCourierId" />
                </AvGroup>
                <AvGroup>
                  <Label for="courierGroups">Courier Group</Label>
                  <AvInput
                    type="select"
                    multiple
                    className="form-control"
                    name="fakecourierGroups"
                    value={this.displaycourierGroup(courier)}
                    onChange={this.courierGroupUpdate}
                  >
                    <option value="" key="0" />
                    {courierGroups
                      ? couriergroups.map(otherEntity => (
                          <option value={otherEntity.name} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput type="hidden" name="courierGroups" value={this.state.idscourierGroup} />
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

const mapStateToProps = storeState => ({
  courierGroups: storeState.courierGroup.entities,
  courier: storeState.courier.entity,
  loading: storeState.courier.loading,
  updating: storeState.courier.updating
});

const mapDispatchToProps = {
  getCourierGroups,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(CourierUpdate);

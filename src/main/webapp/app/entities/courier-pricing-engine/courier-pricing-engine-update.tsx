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
import { IWarehouse } from 'app/shared/model/warehouse.model';
import { getEntities as getWarehouses } from 'app/entities/warehouse/warehouse.reducer';
import { IRegionType } from 'app/shared/model/region-type.model';
import { getEntities as getRegionTypes } from 'app/entities/region-type/region-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './courier-pricing-engine.reducer';
import { ICourierPricingEngine } from 'app/shared/model/courier-pricing-engine.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ICourierPricingEngineUpdateProps {
  getEntity: ICrudGetAction<ICourierPricingEngine>;
  updateEntity: ICrudPutAction<ICourierPricingEngine>;
  createEntity: ICrudPutAction<ICourierPricingEngine>;
  getCouriers: ICrudGetAllAction<ICourier>;
  couriers: ICourier[];
  getWarehouses: ICrudGetAllAction<IWarehouse>;
  warehouses: IWarehouse[];
  getRegionTypes: ICrudGetAllAction<IRegionType>;
  regionTypes: IRegionType[];
  courierPricingEngine: ICourierPricingEngine;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface ICourierPricingEngineUpdateState {
  isNew: boolean;
  courierId: number;
  warehouseId: number;
  regionTypeId: number;
}

export class CourierPricingEngineUpdate extends React.Component<ICourierPricingEngineUpdateProps, ICourierPricingEngineUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      courierId: 0,
      warehouseId: 0,
      regionTypeId: 0,
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
    this.props.getWarehouses();
    this.props.getRegionTypes();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { courierPricingEngine } = this.props;
      const entity = {
        ...courierPricingEngine,
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
    this.props.history.push('/entity/courier-pricing-engine');
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

  warehouseUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        warehouseId: -1
      });
    } else {
      for (const i in this.props.warehouses) {
        if (name === this.props.warehouses[i].name.toString()) {
          this.setState({
            warehouseId: this.props.warehouses[i].id
          });
        }
      }
    }
  };

  regionTypeUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        regionTypeId: -1
      });
    } else {
      for (const i in this.props.regionTypes) {
        if (name === this.props.regionTypes[i].name.toString()) {
          this.setState({
            regionTypeId: this.props.regionTypes[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { courierPricingEngine, couriers, warehouses, regionTypes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-courier-pricing-engine-heading">Create or edit a CourierPricingEngine</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : courierPricingEngine} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="firstBaseWtLabel" for="firstBaseWt">
                    First Base Wt
                  </Label>
                  <AvField
                    type="number"
                    className="form-control"
                    name="firstBaseWt"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="firstBaseCostLabel" for="firstBaseCost">
                    First Base Cost
                  </Label>
                  <AvField
                    type="number"
                    className="form-control"
                    name="firstBaseCost"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="secondBaseWtLabel" for="secondBaseWt">
                    Second Base Wt
                  </Label>
                  <AvField type="number" className="form-control" name="secondBaseWt" />
                </AvGroup>
                <AvGroup>
                  <Label id="secondBaseCostLabel" for="secondBaseCost">
                    Second Base Cost
                  </Label>
                  <AvField type="number" className="form-control" name="secondBaseCost" />
                </AvGroup>
                <AvGroup>
                  <Label id="additionalWtLabel" for="additionalWt">
                    Additional Wt
                  </Label>
                  <AvField
                    type="number"
                    className="form-control"
                    name="additionalWt"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="additionalCostLabel" for="additionalCost">
                    Additional Cost
                  </Label>
                  <AvField
                    type="number"
                    className="form-control"
                    name="additionalCost"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="fuelSurchargeLabel" for="fuelSurcharge">
                    Fuel Surcharge
                  </Label>
                  <AvField type="number" className="form-control" name="fuelSurcharge" />
                </AvGroup>
                <AvGroup>
                  <Label id="minCodChargesLabel" for="minCodCharges">
                    Min Cod Charges
                  </Label>
                  <AvField type="number" className="form-control" name="minCodCharges" />
                </AvGroup>
                <AvGroup>
                  <Label id="codCutoffAmountLabel" for="codCutoffAmount">
                    Cod Cutoff Amount
                  </Label>
                  <AvField type="number" className="form-control" name="codCutoffAmount" />
                </AvGroup>
                <AvGroup>
                  <Label id="variableCodChargesLabel" for="variableCodCharges">
                    Variable Cod Charges
                  </Label>
                  <AvField type="number" className="form-control" name="variableCodCharges" />
                </AvGroup>
                <AvGroup>
                  <Label id="validUptoLabel" for="validUpto">
                    Valid Upto
                  </Label>
                  <AvField type="date" className="form-control" name="validUpto" />
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
                  <Label for="warehouse.name">Warehouse</Label>
                  <AvInput type="select" className="form-control" name="warehouseId" onChange={this.warehouseUpdate}>
                    <option value="" key="0" />
                    {warehouses
                      ? warehouses.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="regionType.name">Region Type</Label>
                  <AvInput type="select" className="form-control" name="regionTypeId" onChange={this.regionTypeUpdate}>
                    <option value="" key="0" />
                    {regionTypes
                      ? regionTypes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/courier-pricing-engine" replace color="info">
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
  warehouses: storeState.warehouse.entities,
  regionTypes: storeState.regionType.entities,
  courierPricingEngine: storeState.courierPricingEngine.entity,
  loading: storeState.courierPricingEngine.loading,
  updating: storeState.courierPricingEngine.updating
});

const mapDispatchToProps = {
  getCouriers,
  getWarehouses,
  getRegionTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(CourierPricingEngineUpdate);

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, createEntity, reset } from './warehouse.reducer';
import { IWarehouse } from 'app/shared/model/warehouse.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IWarehouseUpdateProps {
  getEntity: ICrudGetAction<IWarehouse>;
  updateEntity: ICrudPutAction<IWarehouse>;
  createEntity: ICrudPutAction<IWarehouse>;
  warehouse: IWarehouse;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface IWarehouseUpdateState {
  isNew: boolean;
}

export class WarehouseUpdate extends React.Component<IWarehouseUpdateProps, IWarehouseUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { warehouse } = this.props;
      const entity = {
        ...warehouse,
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
    this.props.history.push('/entity/warehouse');
  };

  render() {
    const isInvalid = false;
    const { warehouse, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-warehouse-heading">Create or edit a Warehouse</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : warehouse} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="tinLabel" for="tin">
                    Tin
                  </Label>
                  <AvField
                    type="text"
                    name="tin"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="identifierLabel" for="identifier">
                    Identifier
                  </Label>
                  <AvField
                    type="text"
                    name="identifier"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
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
                  <Label id="line1Label" for="line1">
                    Line 1
                  </Label>
                  <AvField type="text" name="line1" />
                </AvGroup>
                <AvGroup>
                  <Label id="line2Label" for="line2">
                    Line 2
                  </Label>
                  <AvField type="text" name="line2" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="city">
                    City
                  </Label>
                  <AvField
                    type="text"
                    name="city"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
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
                  <Label id="whPhoneLabel" for="whPhone">
                    Wh Phone
                  </Label>
                  <AvField type="text" name="whPhone" />
                </AvGroup>
                <AvGroup>
                  <Label id="warehouseTypeLabel" for="warehouseType">
                    Warehouse Type
                  </Label>
                  <AvField
                    type="number"
                    className="form-control"
                    name="warehouseType"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="honoringB2COrdersLabel" check>
                    <AvInput type="checkbox" className="form-control" name="honoringB2COrders" />
                    Honoring B 2 C Orders
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="activeLabel" check>
                    <AvInput type="checkbox" className="form-control" name="active" />
                    Active
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="prefixInvoiceGenerationLabel" for="prefixInvoiceGeneration">
                    Prefix Invoice Generation
                  </Label>
                  <AvField
                    type="text"
                    name="prefixInvoiceGeneration"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="fulfilmentCenterCodeLabel" for="fulfilmentCenterCode">
                    Fulfilment Center Code
                  </Label>
                  <AvField type="text" name="fulfilmentCenterCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="storeDeliveryLabel" check>
                    <AvInput type="checkbox" className="form-control" name="storeDelivery" />
                    Store Delivery
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="gstinLabel" for="gstin">
                    Gstin
                  </Label>
                  <AvField type="text" name="gstin" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/warehouse" replace color="info">
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
  warehouse: storeState.warehouse.entity,
  loading: storeState.warehouse.loading,
  updating: storeState.warehouse.updating
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseUpdate);

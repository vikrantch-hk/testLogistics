import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IVendor } from 'app/shared/model/vendor.model';
import { getEntities as getVendors } from 'app/entities/vendor/vendor.reducer';
import { IWarehouse } from 'app/shared/model/warehouse.model';
import { getEntities as getWarehouses } from 'app/entities/warehouse/warehouse.reducer';
import { ICourierChannel } from 'app/shared/model/courier-channel.model';
import { getEntities as getCourierChannels } from 'app/entities/courier-channel/courier-channel.reducer';
import { getEntity, updateEntity, createEntity, reset } from './vendor-wh-courier-mapping.reducer';
import { IVendorWHCourierMapping } from 'app/shared/model/vendor-wh-courier-mapping.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IVendorWHCourierMappingUpdateProps {
  getEntity: ICrudGetAction<IVendorWHCourierMapping>;
  updateEntity: ICrudPutAction<IVendorWHCourierMapping>;
  createEntity: ICrudPutAction<IVendorWHCourierMapping>;
  getVendors: ICrudGetAllAction<IVendor>;
  vendors: IVendor[];
  getWarehouses: ICrudGetAllAction<IWarehouse>;
  warehouses: IWarehouse[];
  getCourierChannels: ICrudGetAllAction<ICourierChannel>;
  courierChannels: ICourierChannel[];
  vendorWHCourierMapping: IVendorWHCourierMapping;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface IVendorWHCourierMappingUpdateState {
  isNew: boolean;
  vendorId: number;
  warehouseId: number;
  courierChannelId: number;
}

export class VendorWHCourierMappingUpdate extends React.Component<IVendorWHCourierMappingUpdateProps, IVendorWHCourierMappingUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      vendorId: 0,
      warehouseId: 0,
      courierChannelId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getVendors();
    this.props.getWarehouses();
    this.props.getCourierChannels();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { vendorWHCourierMapping } = this.props;
      const entity = {
        ...vendorWHCourierMapping,
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
    this.props.history.push('/entity/vendor-wh-courier-mapping');
  };

  vendorUpdate = element => {
    const shortCode = element.target.value.toString();
    if (shortCode === '') {
      this.setState({
        vendorId: -1
      });
    } else {
      for (const i in this.props.vendors) {
        if (shortCode === this.props.vendors[i].shortCode.toString()) {
          this.setState({
            vendorId: this.props.vendors[i].id
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

  courierChannelUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        courierChannelId: -1
      });
    } else {
      for (const i in this.props.courierChannels) {
        if (name === this.props.courierChannels[i].name.toString()) {
          this.setState({
            courierChannelId: this.props.courierChannels[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { vendorWHCourierMapping, vendors, warehouses, courierChannels, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-vendor-wh-courier-mapping-heading">Create or edit a VendorWHCourierMapping</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : vendorWHCourierMapping} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="activeLabel" check>
                    <AvInput type="checkbox" className="form-control" name="active" />
                    Active
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="vendor.shortCode">Vendor</Label>
                  <AvInput type="select" className="form-control" name="vendorId" onChange={this.vendorUpdate}>
                    <option value="" key="0" />
                    {vendors
                      ? vendors.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.shortCode}
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
                  <Label for="courierChannel.name">Courier Channel</Label>
                  <AvInput type="select" className="form-control" name="courierChannelId" onChange={this.courierChannelUpdate}>
                    <option value="" key="0" />
                    {courierChannels
                      ? courierChannels.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/vendor-wh-courier-mapping" replace color="info">
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
  vendors: storeState.vendor.entities,
  warehouses: storeState.warehouse.entities,
  courierChannels: storeState.courierChannel.entities,
  vendorWHCourierMapping: storeState.vendorWHCourierMapping.entity,
  loading: storeState.vendorWHCourierMapping.loading,
  updating: storeState.vendorWHCourierMapping.updating
});

const mapDispatchToProps = {
  getVendors,
  getWarehouses,
  getCourierChannels,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorWHCourierMappingUpdate);

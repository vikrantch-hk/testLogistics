import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './warehouse.reducer';
import { IWarehouse } from 'app/shared/model/warehouse.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWarehouseDetailProps {
  getEntity: ICrudGetAction<IWarehouse>;
  warehouse: IWarehouse;
  match: any;
}

export class WarehouseDetail extends React.Component<IWarehouseDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { warehouse } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Warehouse [<b>{warehouse.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="tin">Tin</span>
              </dt>
              <dd>{warehouse.tin}</dd>
              <dt>
                <span id="identifier">Identifier</span>
              </dt>
              <dd>{warehouse.identifier}</dd>
              <dt>
                <span id="name">Name</span>
              </dt>
              <dd>{warehouse.name}</dd>
              <dt>
                <span id="line1">Line 1</span>
              </dt>
              <dd>{warehouse.line1}</dd>
              <dt>
                <span id="line2">Line 2</span>
              </dt>
              <dd>{warehouse.line2}</dd>
              <dt>
                <span id="city">City</span>
              </dt>
              <dd>{warehouse.city}</dd>
              <dt>
                <span id="pincode">Pincode</span>
              </dt>
              <dd>{warehouse.pincode}</dd>
              <dt>
                <span id="whPhone">Wh Phone</span>
              </dt>
              <dd>{warehouse.whPhone}</dd>
              <dt>
                <span id="warehouseType">Warehouse Type</span>
              </dt>
              <dd>{warehouse.warehouseType}</dd>
              <dt>
                <span id="honoringB2COrders">Honoring B 2 C Orders</span>
              </dt>
              <dd>{warehouse.honoringB2COrders ? 'true' : 'false'}</dd>
              <dt>
                <span id="active">Active</span>
              </dt>
              <dd>{warehouse.active ? 'true' : 'false'}</dd>
              <dt>
                <span id="prefixInvoiceGeneration">Prefix Invoice Generation</span>
              </dt>
              <dd>{warehouse.prefixInvoiceGeneration}</dd>
              <dt>
                <span id="fulfilmentCenterCode">Fulfilment Center Code</span>
              </dt>
              <dd>{warehouse.fulfilmentCenterCode}</dd>
              <dt>
                <span id="storeDelivery">Store Delivery</span>
              </dt>
              <dd>{warehouse.storeDelivery ? 'true' : 'false'}</dd>
              <dt>
                <span id="gstin">Gstin</span>
              </dt>
              <dd>{warehouse.gstin}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/warehouse" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/warehouse/${warehouse.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ warehouse }) => ({
  warehouse: warehouse.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseDetail);

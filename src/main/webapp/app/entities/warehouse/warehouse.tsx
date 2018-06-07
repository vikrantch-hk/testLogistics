import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntities } from './warehouse.reducer';
import { IWarehouse } from 'app/shared/model/warehouse.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWarehouseProps {
  getEntities: ICrudGetAllAction<IWarehouse>;
  warehouseList: IWarehouse[];
  match: any;
}

export class Warehouse extends React.Component<IWarehouseProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { warehouseList, match } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          Warehouses
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Warehouse
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tin</th>
                <th>Identifier</th>
                <th>Name</th>
                <th>Line 1</th>
                <th>Line 2</th>
                <th>City</th>
                <th>Pincode</th>
                <th>Wh Phone</th>
                <th>Warehouse Type</th>
                <th>Honoring B 2 C Orders</th>
                <th>Active</th>
                <th>Prefix Invoice Generation</th>
                <th>Fulfilment Center Code</th>
                <th>Store Delivery</th>
                <th>Gstin</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {warehouseList.map((warehouse, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${warehouse.id}`} color="link" size="sm">
                      {warehouse.id}
                    </Button>
                  </td>
                  <td>{warehouse.tin}</td>
                  <td>{warehouse.identifier}</td>
                  <td>{warehouse.name}</td>
                  <td>{warehouse.line1}</td>
                  <td>{warehouse.line2}</td>
                  <td>{warehouse.city}</td>
                  <td>{warehouse.pincode}</td>
                  <td>{warehouse.whPhone}</td>
                  <td>{warehouse.warehouseType}</td>
                  <td>{warehouse.honoringB2COrders ? 'true' : 'false'}</td>
                  <td>{warehouse.active ? 'true' : 'false'}</td>
                  <td>{warehouse.prefixInvoiceGeneration}</td>
                  <td>{warehouse.fulfilmentCenterCode}</td>
                  <td>{warehouse.storeDelivery ? 'true' : 'false'}</td>
                  <td>{warehouse.gstin}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${warehouse.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${warehouse.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${warehouse.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ warehouse }) => ({
  warehouseList: warehouse.entities
});

const mapDispatchToProps = {
  getEntities
};

export default connect(mapStateToProps, mapDispatchToProps)(Warehouse);

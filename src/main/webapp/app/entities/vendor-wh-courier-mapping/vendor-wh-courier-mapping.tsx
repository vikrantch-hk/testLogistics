import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntities } from './vendor-wh-courier-mapping.reducer';
import { IVendorWHCourierMapping } from 'app/shared/model/vendor-wh-courier-mapping.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVendorWHCourierMappingProps {
  getEntities: ICrudGetAllAction<IVendorWHCourierMapping>;
  vendorWHCourierMappingList: IVendorWHCourierMapping[];
  match: any;
}

export class VendorWHCourierMapping extends React.Component<IVendorWHCourierMappingProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { vendorWHCourierMappingList, match } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          Vendor WH Courier Mappings
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Vendor WH Courier Mapping
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Active</th>
                <th>Vendor</th>
                <th>Warehouse</th>
                <th>Courier Channel</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vendorWHCourierMappingList.map((vendorWHCourierMapping, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${vendorWHCourierMapping.id}`} color="link" size="sm">
                      {vendorWHCourierMapping.id}
                    </Button>
                  </td>
                  <td>{vendorWHCourierMapping.active ? 'true' : 'false'}</td>
                  <td>
                    {vendorWHCourierMapping.vendorShortCode ? (
                      <Link to={`vendor/${vendorWHCourierMapping.vendorId}`}>{vendorWHCourierMapping.vendorShortCode}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {vendorWHCourierMapping.warehouseName ? (
                      <Link to={`warehouse/${vendorWHCourierMapping.warehouseId}`}>{vendorWHCourierMapping.warehouseName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {vendorWHCourierMapping.courierChannelName ? (
                      <Link to={`courierChannel/${vendorWHCourierMapping.courierChannelId}`}>
                        {vendorWHCourierMapping.courierChannelName}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${vendorWHCourierMapping.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vendorWHCourierMapping.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vendorWHCourierMapping.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ vendorWHCourierMapping }) => ({
  vendorWHCourierMappingList: vendorWHCourierMapping.entities
});

const mapDispatchToProps = {
  getEntities
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorWHCourierMapping);

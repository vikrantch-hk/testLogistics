import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntities } from './pincode-region-zone.reducer';
import { IPincodeRegionZone } from 'app/shared/model/pincode-region-zone.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPincodeRegionZoneProps {
  getEntities: ICrudGetAllAction<IPincodeRegionZone>;
  pincodeRegionZoneList: IPincodeRegionZone[];
  match: any;
}

export class PincodeRegionZone extends React.Component<IPincodeRegionZoneProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { pincodeRegionZoneList, match } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          Pincode Region Zones
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Pincode Region Zone
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Region Type</th>
                <th>Courier Group</th>
                <th>Source Destination Mapping</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pincodeRegionZoneList.map((pincodeRegionZone, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${pincodeRegionZone.id}`} color="link" size="sm">
                      {pincodeRegionZone.id}
                    </Button>
                  </td>
                  <td>
                    {pincodeRegionZone.regionTypeName ? (
                      <Link to={`regionType/${pincodeRegionZone.regionTypeId}`}>{pincodeRegionZone.regionTypeName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {pincodeRegionZone.courierGroupName ? (
                      <Link to={`courierGroup/${pincodeRegionZone.courierGroupId}`}>{pincodeRegionZone.courierGroupName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {pincodeRegionZone.sourceDestinationMappingId ? (
                      <Link to={`sourceDestinationMapping/${pincodeRegionZone.sourceDestinationMappingId}`}>
                        {pincodeRegionZone.sourceDestinationMappingId}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${pincodeRegionZone.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pincodeRegionZone.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pincodeRegionZone.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ pincodeRegionZone }) => ({
  pincodeRegionZoneList: pincodeRegionZone.entities
});

const mapDispatchToProps = {
  getEntities
};

export default connect(mapStateToProps, mapDispatchToProps)(PincodeRegionZone);

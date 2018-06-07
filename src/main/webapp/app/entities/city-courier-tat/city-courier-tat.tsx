import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntities } from './city-courier-tat.reducer';
import { ICityCourierTAT } from 'app/shared/model/city-courier-tat.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICityCourierTATProps {
  getEntities: ICrudGetAllAction<ICityCourierTAT>;
  cityCourierTATList: ICityCourierTAT[];
  match: any;
}

export class CityCourierTAT extends React.Component<ICityCourierTATProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { cityCourierTATList, match } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          City Courier TATS
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new City Courier TAT
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Turnaround Time</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cityCourierTATList.map((cityCourierTAT, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${cityCourierTAT.id}`} color="link" size="sm">
                      {cityCourierTAT.id}
                    </Button>
                  </td>
                  <td>{cityCourierTAT.turnaroundTime}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${cityCourierTAT.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cityCourierTAT.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cityCourierTAT.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ cityCourierTAT }) => ({
  cityCourierTATList: cityCourierTAT.entities
});

const mapDispatchToProps = {
  getEntities
};

export default connect(mapStateToProps, mapDispatchToProps)(CityCourierTAT);

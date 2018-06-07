import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntities } from './awb.reducer';
import { IAwb } from 'app/shared/model/awb.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAwbProps {
  getEntities: ICrudGetAllAction<IAwb>;
  awbList: IAwb[];
  match: any;
}

export class Awb extends React.Component<IAwbProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { awbList, match } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          Awbs
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Awb
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Awb Number</th>
                <th>Awb Bar Code</th>
                <th>Cod</th>
                <th>Create Date</th>
                <th>Return Awb Number</th>
                <th>Return Awb Bar Code</th>
                <th>Is Bright Awb</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {awbList.map((awb, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${awb.id}`} color="link" size="sm">
                      {awb.id}
                    </Button>
                  </td>
                  <td>{awb.awbNumber}</td>
                  <td>{awb.awbBarCode}</td>
                  <td>{awb.cod ? 'true' : 'false'}</td>
                  <td>
                    <TextFormat type="date" value={awb.createDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{awb.returnAwbNumber}</td>
                  <td>{awb.returnAwbBarCode}</td>
                  <td>{awb.isBrightAwb ? 'true' : 'false'}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${awb.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${awb.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${awb.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ awb }) => ({
  awbList: awb.entities
});

const mapDispatchToProps = {
  getEntities
};

export default connect(mapStateToProps, mapDispatchToProps)(Awb);

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntities } from './courier-attributes.reducer';
import { ICourierAttributes } from 'app/shared/model/courier-attributes.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICourierAttributesProps {
  getEntities: ICrudGetAllAction<ICourierAttributes>;
  courierAttributesList: ICourierAttributes[];
  match: any;
}

export class CourierAttributes extends React.Component<ICourierAttributesProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { courierAttributesList, match } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          Courier Attributes
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Courier Attributes
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Prepaid Air</th>
                <th>Prepaid Ground</th>
                <th>Cod Air</th>
                <th>Cod Ground</th>
                <th>Reverse Air</th>
                <th>Reverse Ground</th>
                <th>Card On Delivery Air</th>
                <th>Card On Delivery Ground</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {courierAttributesList.map((courierAttributes, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${courierAttributes.id}`} color="link" size="sm">
                      {courierAttributes.id}
                    </Button>
                  </td>
                  <td>{courierAttributes.prepaidAir ? 'true' : 'false'}</td>
                  <td>{courierAttributes.prepaidGround ? 'true' : 'false'}</td>
                  <td>{courierAttributes.codAir ? 'true' : 'false'}</td>
                  <td>{courierAttributes.codGround ? 'true' : 'false'}</td>
                  <td>{courierAttributes.reverseAir ? 'true' : 'false'}</td>
                  <td>{courierAttributes.reverseGround ? 'true' : 'false'}</td>
                  <td>{courierAttributes.cardOnDeliveryAir ? 'true' : 'false'}</td>
                  <td>{courierAttributes.cardOnDeliveryGround ? 'true' : 'false'}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${courierAttributes.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${courierAttributes.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${courierAttributes.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ courierAttributes }) => ({
  courierAttributesList: courierAttributes.entities
});

const mapDispatchToProps = {
  getEntities
};

export default connect(mapStateToProps, mapDispatchToProps)(CourierAttributes);

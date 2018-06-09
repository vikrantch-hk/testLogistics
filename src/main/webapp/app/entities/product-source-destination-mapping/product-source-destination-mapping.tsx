import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntities } from './product-source-destination-mapping.reducer';
import { IProductSourceDestinationMapping } from 'app/shared/model/product-source-destination-mapping.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductSourceDestinationMappingProps {
  getEntities: ICrudGetAllAction<IProductSourceDestinationMapping>;
  productSourceDestinationMappingList: IProductSourceDestinationMapping[];
  match: any;
}

export class ProductSourceDestinationMapping extends React.Component<IProductSourceDestinationMappingProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { productSourceDestinationMappingList, match } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          Product Source Destination Mappings
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Product Source Destination Mapping
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {productSourceDestinationMappingList.map((productSourceDestinationMapping, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${productSourceDestinationMapping.id}`} color="link" size="sm">
                      {productSourceDestinationMapping.id}
                    </Button>
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${productSourceDestinationMapping.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${productSourceDestinationMapping.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${productSourceDestinationMapping.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ productSourceDestinationMapping }) => ({
  productSourceDestinationMappingList: productSourceDestinationMapping.entities
});

const mapDispatchToProps = {
  getEntities
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductSourceDestinationMapping);

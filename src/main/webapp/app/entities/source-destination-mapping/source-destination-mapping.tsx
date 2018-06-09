import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntities } from './source-destination-mapping.reducer';
import { ISourceDestinationMapping } from 'app/shared/model/source-destination-mapping.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISourceDestinationMappingProps {
  getEntities: ICrudGetAllAction<ISourceDestinationMapping>;
  sourceDestinationMappingList: ISourceDestinationMapping[];
  match: any;
}

export class SourceDestinationMapping extends React.Component<ISourceDestinationMappingProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { sourceDestinationMappingList, match } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          Source Destination Mappings
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Source Destination Mapping
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Source Pincode</th>
                <th>Destination Pincode</th>
                <th>Product</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sourceDestinationMappingList.map((sourceDestinationMapping, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${sourceDestinationMapping.id}`} color="link" size="sm">
                      {sourceDestinationMapping.id}
                    </Button>
                  </td>
                  <td>{sourceDestinationMapping.sourcePincode}</td>
                  <td>{sourceDestinationMapping.destinationPincode}</td>
                  <td>
                    {sourceDestinationMapping.productName ? (
                      <Link to={`product/${sourceDestinationMapping.productId}`}>{sourceDestinationMapping.productName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${sourceDestinationMapping.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${sourceDestinationMapping.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${sourceDestinationMapping.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ sourceDestinationMapping }) => ({
  sourceDestinationMappingList: sourceDestinationMapping.entities
});

const mapDispatchToProps = {
  getEntities
};

export default connect(mapStateToProps, mapDispatchToProps)(SourceDestinationMapping);

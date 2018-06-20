import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './source-destination-mapping.reducer';
import { ISourceDestinationMapping } from 'app/shared/model/source-destination-mapping.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISourceDestinationMappingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class SourceDestinationMappingDetail extends React.Component<ISourceDestinationMappingDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { sourceDestinationMappingEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            SourceDestinationMapping [<b>{sourceDestinationMappingEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="sourcePincode">Source Pincode</span>
            </dt>
            <dd>{sourceDestinationMappingEntity.sourcePincode}</dd>
            <dt>
              <span id="destinationPincode">Destination Pincode</span>
            </dt>
            <dd>{sourceDestinationMappingEntity.destinationPincode}</dd>
            <dt>Product</dt>
            <dd>{sourceDestinationMappingEntity.productName ? sourceDestinationMappingEntity.productName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/source-destination-mapping" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/source-destination-mapping/${sourceDestinationMappingEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ sourceDestinationMapping }: IRootState) => ({
  sourceDestinationMappingEntity: sourceDestinationMapping.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SourceDestinationMappingDetail);

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './source-destination-mapping.reducer';
import { ISourceDestinationMapping } from 'app/shared/model/source-destination-mapping.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISourceDestinationMappingDetailProps {
  getEntity: ICrudGetAction<ISourceDestinationMapping>;
  sourceDestinationMapping: ISourceDestinationMapping;
  match: any;
}

export class SourceDestinationMappingDetail extends React.Component<ISourceDestinationMappingDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { sourceDestinationMapping } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            SourceDestinationMapping [<b>{sourceDestinationMapping.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="sourcePincode">Source Pincode</span>
              </dt>
              <dd>{sourceDestinationMapping.sourcePincode}</dd>
              <dt>
                <span id="destinationPincode">Destination Pincode</span>
              </dt>
              <dd>{sourceDestinationMapping.destinationPincode}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/source-destination-mapping" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/source-destination-mapping/${sourceDestinationMapping.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ sourceDestinationMapping }) => ({
  sourceDestinationMapping: sourceDestinationMapping.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(SourceDestinationMappingDetail);

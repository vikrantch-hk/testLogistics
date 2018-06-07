import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './region-type.reducer';
import { IRegionType } from 'app/shared/model/region-type.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRegionTypeDetailProps {
  getEntity: ICrudGetAction<IRegionType>;
  regionType: IRegionType;
  match: any;
}

export class RegionTypeDetail extends React.Component<IRegionTypeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { regionType } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            RegionType [<b>{regionType.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="name">Name</span>
              </dt>
              <dd>{regionType.name}</dd>
              <dt>
                <span id="priority">Priority</span>
              </dt>
              <dd>{regionType.priority}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/region-type" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/region-type/${regionType.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ regionType }) => ({
  regionType: regionType.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(RegionTypeDetail);

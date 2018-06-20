import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './hub.reducer';
import { IHub } from 'app/shared/model/hub.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHubDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class HubDetail extends React.Component<IHubDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { hubEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Hub [<b>{hubEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{hubEntity.name}</dd>
            <dt>
              <span id="address">Address</span>
            </dt>
            <dd>{hubEntity.address}</dd>
            <dt>
              <span id="country">Country</span>
            </dt>
            <dd>{hubEntity.country}</dd>
          </dl>
          <Button tag={Link} to="/entity/hub" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/hub/${hubEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ hub }: IRootState) => ({
  hubEntity: hub.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HubDetail);

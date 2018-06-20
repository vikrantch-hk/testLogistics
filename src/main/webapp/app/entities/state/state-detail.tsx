import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './state.reducer';
import { IState } from 'app/shared/model/state.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class StateDetail extends React.Component<IStateDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { stateEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            State [<b>{stateEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{stateEntity.name}</dd>
            <dt>
              <span id="identifier">Identifier</span>
            </dt>
            <dd>{stateEntity.identifier}</dd>
            <dt>
              <span id="unionTerritory">Union Territory</span>
            </dt>
            <dd>{stateEntity.unionTerritory ? 'true' : 'false'}</dd>
          </dl>
          <Button tag={Link} to="/entity/state" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/state/${stateEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ state }: IRootState) => ({
  stateEntity: state.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StateDetail);

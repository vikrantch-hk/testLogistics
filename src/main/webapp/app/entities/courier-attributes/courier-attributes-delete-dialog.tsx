import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { ICourierAttributes } from 'app/shared/model/courier-attributes.model';
import { getEntity, deleteEntity } from './courier-attributes.reducer';

export interface ICourierAttributesDeleteDialogProps {
  getEntity: ICrudGetAction<ICourierAttributes>;
  deleteEntity: ICrudDeleteAction<ICourierAttributes>;
  courierAttributes: ICourierAttributes;
  match: any;
  history: any;
}

export class CourierAttributesDeleteDialog extends React.Component<ICourierAttributesDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.courierAttributes.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { courierAttributes } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>Confirm delete operation</ModalHeader>
        <ModalBody>Are you sure you want to delete this CourierAttributes?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />&nbsp; Cancel
          </Button>
          <Button color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />&nbsp; Delete
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ courierAttributes }) => ({
  courierAttributes: courierAttributes.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

export default connect(mapStateToProps, mapDispatchToProps)(CourierAttributesDeleteDialog);

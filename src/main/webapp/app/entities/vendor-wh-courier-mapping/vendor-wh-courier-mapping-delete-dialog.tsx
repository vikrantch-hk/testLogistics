import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IVendorWHCourierMapping } from 'app/shared/model/vendor-wh-courier-mapping.model';
import { getEntity, deleteEntity } from './vendor-wh-courier-mapping.reducer';

export interface IVendorWHCourierMappingDeleteDialogProps {
  getEntity: ICrudGetAction<IVendorWHCourierMapping>;
  deleteEntity: ICrudDeleteAction<IVendorWHCourierMapping>;
  vendorWHCourierMapping: IVendorWHCourierMapping;
  match: any;
  history: any;
}

export class VendorWHCourierMappingDeleteDialog extends React.Component<IVendorWHCourierMappingDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.vendorWHCourierMapping.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { vendorWHCourierMapping } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>Confirm delete operation</ModalHeader>
        <ModalBody>Are you sure you want to delete this VendorWHCourierMapping?</ModalBody>
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

const mapStateToProps = ({ vendorWHCourierMapping }) => ({
  vendorWHCourierMapping: vendorWHCourierMapping.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

export default connect(mapStateToProps, mapDispatchToProps)(VendorWHCourierMappingDeleteDialog);

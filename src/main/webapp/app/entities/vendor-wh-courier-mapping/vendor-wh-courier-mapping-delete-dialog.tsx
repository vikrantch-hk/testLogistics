import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IVendorWHCourierMapping } from 'app/shared/model/vendor-wh-courier-mapping.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './vendor-wh-courier-mapping.reducer';

export interface IVendorWHCourierMappingDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class VendorWHCourierMappingDeleteDialog extends React.Component<IVendorWHCourierMappingDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.vendorWHCourierMappingEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { vendorWHCourierMappingEntity } = this.props;
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

const mapStateToProps = ({ vendorWHCourierMapping }: IRootState) => ({
  vendorWHCourierMappingEntity: vendorWHCourierMapping.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VendorWHCourierMappingDeleteDialog);

// Code generated by MockGen. DO NOT EDIT.
// Source: graphelier-service/db/mongo.go

// Package mock_db is a generated GoMock package.
package mock_db

import (
	gomock "github.com/golang/mock/gomock"
	models "graphelier/core/graphelier-service/models"
	reflect "reflect"
)

// MockDatastore is a mock of Datastore interface
type MockDatastore struct {
	ctrl     *gomock.Controller
	recorder *MockDatastoreMockRecorder
}

// MockDatastoreMockRecorder is the mock recorder for MockDatastore
type MockDatastoreMockRecorder struct {
	mock *MockDatastore
}

// NewMockDatastore creates a new mock instance
func NewMockDatastore(ctrl *gomock.Controller) *MockDatastore {
	mock := &MockDatastore{ctrl: ctrl}
	mock.recorder = &MockDatastoreMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use
func (m *MockDatastore) EXPECT() *MockDatastoreMockRecorder {
	return m.recorder
}

// GetOrderbook mocks base method
func (m *MockDatastore) GetOrderbook(instrument string, timestamp uint64) (*models.Orderbook, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetOrderbook", instrument, timestamp)
	ret0, _ := ret[0].(*models.Orderbook)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetOrderbook indicates an expected call of GetOrderbook
func (mr *MockDatastoreMockRecorder) GetOrderbook(instrument, timestamp interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetOrderbook", reflect.TypeOf((*MockDatastore)(nil).GetOrderbook), instrument, timestamp)
}

// GetMessagesByTimestamp mocks base method
func (m *MockDatastore) GetMessagesByTimestamp(instrument string, timestamp uint64) ([]*models.Message, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetMessagesByTimestamp", instrument, timestamp)
	ret0, _ := ret[0].([]*models.Message)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetMessagesByTimestamp indicates an expected call of GetMessagesByTimestamp
func (mr *MockDatastoreMockRecorder) GetMessagesByTimestamp(instrument, timestamp interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetMessagesByTimestamp", reflect.TypeOf((*MockDatastore)(nil).GetMessagesByTimestamp), instrument, timestamp)
}

// GetMessagesWithPagination mocks base method
func (m *MockDatastore) GetMessagesWithPagination(instrument string, paginator *models.Paginator) ([]*models.Message, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetMessagesWithPagination", instrument, paginator)
	ret0, _ := ret[0].([]*models.Message)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetMessagesWithPagination indicates an expected call of GetMessagesWithPagination
func (mr *MockDatastoreMockRecorder) GetMessagesWithPagination(instrument, paginator interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetMessagesWithPagination", reflect.TypeOf((*MockDatastore)(nil).GetMessagesWithPagination), instrument, paginator)
}

// GetSingleMessage mocks base method
func (m *MockDatastore) GetSingleMessage(instrument string, sodOffset int64) (*models.Message, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetSingleMessage", instrument, sodOffset)
	ret0, _ := ret[0].(*models.Message)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetSingleMessage indicates an expected call of GetSingleMessage
func (mr *MockDatastoreMockRecorder) GetSingleMessage(instrument, sodOffset interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetSingleMessage", reflect.TypeOf((*MockDatastore)(nil).GetSingleMessage), instrument, sodOffset)
}

// GetInstruments mocks base method
func (m *MockDatastore) GetInstruments() ([]string, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetInstruments")
	ret0, _ := ret[0].([]string)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetInstruments indicates an expected call of GetInstruments
func (mr *MockDatastoreMockRecorder) GetInstruments() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetInstruments", reflect.TypeOf((*MockDatastore)(nil).GetInstruments))
}

// RefreshCache mocks base method
func (m *MockDatastore) RefreshCache() error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "RefreshCache")
	ret0, _ := ret[0].(error)
	return ret0
}

// RefreshCache indicates an expected call of RefreshCache
func (mr *MockDatastoreMockRecorder) RefreshCache() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "RefreshCache", reflect.TypeOf((*MockDatastore)(nil).RefreshCache))
}

// GetSingleOrderMessages mocks base method
func (m *MockDatastore) GetSingleOrderMessages(instrument string, SODTimestamp, EODTimestamp, orderID int64) ([]*models.Message, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetSingleOrderMessages", instrument, SODTimestamp, EODTimestamp, orderID)
	ret0, _ := ret[0].([]*models.Message)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetSingleOrderMessages indicates an expected call of GetSingleOrderMessages
func (mr *MockDatastoreMockRecorder) GetSingleOrderMessages(instrument, SODTimestamp, EODTimestamp, orderID interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetSingleOrderMessages", reflect.TypeOf((*MockDatastore)(nil).GetSingleOrderMessages), instrument, SODTimestamp, EODTimestamp, orderID)
}

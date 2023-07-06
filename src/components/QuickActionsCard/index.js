import React, { useReducer } from 'react'
import { Card, Button, Dropdown, message, Modal, Space } from 'antd'
import { DownOutlined, UserOutlined, ReloadOutlined } from '@ant-design/icons'
import { copyToClipboard } from '../../lib/utils'
import RandomizeDialogContent from './RandomizeDialog'

const initialState = {
  ctcLoading: false,
  resetLoading: false,
  refreshLoading: false,
  returnLoading: false,
  loadRandomizeModal: false,
  randomUserKey: null,
  randomizeInProgress: false,
  randomUsers: 0
}

const reducer = (state, newState) => ({ ...state, ...newState })

const QuickActionsCard = () => {
  const [state, setState] = useReducer(reducer, initialState)

  const handleResetDashboard = () => {
    setState({ resetLoading: true })

    Modal.confirm({
      title: 'Reset Dashboard',
      content: 'Are you sure you want to reset the dashboard? This action cannot be undone.',
      okText: 'Confirm',
      okType: 'danger',
      onOk: () => {
        setState({ resetLoading: false })
        message.success('Reset Confirmed')
      },
      onCancel: () => {
        setState({ resetLoading: false })
        message.warning('Reset Cancelled')
      }
    })
  }

  const handleRefreshDashboardValues = () => {
    setState({ refreshLoading: true })

    Modal.confirm({
      title: 'Refresh Dashboard Values',
      content: 'Are you sure you want to refresh values in this Dashboard? This action cannot be undone.',
      okText: 'Confirm',
      okType: 'danger',
      onOk: () => {
        setState({ refreshLoading: false })
        message.success('Refresh Confirmed')
      },
      onCancel: () => {
        setState({ refreshLoading: false })
        message.warning('Refresh Cancelled')
      }
    })
  }

  const handleCopyToClipboard = async (item) => {
    try {
      setState({ ctcLoading: true })
      await copyToClipboard(item.key)
      setState({ ctcLoading: false })
      message.success('Success')
    } catch (e) {
      message.error(e.message)
    }
  }

  const handleLoadRandomizeDialog = (item) => {
    setState({
      returnLoading: true,
      loadRandomizeModal: true,
      randomUserKey: item.key
    })
  }

  const handleCloseRandomizeDialog = () => {
    setState({
      returnLoading: false,
      loadRandomizeModal: false,
      randomUserKey: null
    })
  }

  const setRandomizeState = (randomizeInProgress, randomUsers) => {
    setState({
      randomizeInProgress,
      randomUsers
    })
  }

  const dropdownItems = [
    {
      label: 'Selected Users In Table',
      key: 'Selected Users In Table',
      icon: <UserOutlined />
    },
    {
      label: 'Followers',
      key: 'Followers',
      icon: <UserOutlined />
    },
    {
      label: 'Following',
      key: 'Following',
      icon: <UserOutlined />
    }
  ]

  return (
    <Card title='Quick Actions'>
      <Button
        danger
        icon={<ReloadOutlined />}
        loading={state.resetLoading}
        disabled={state.resetLoading}
        onClick={handleResetDashboard}
      >
        Reset Dashboard
      </Button>
      <Button
        icon={<ReloadOutlined />}
        loading={state.refreshLoading}
        disabled={state.refreshLoading}
        onClick={handleRefreshDashboardValues}
      >
        Refresh Dashboard Values
      </Button>
      <Dropdown
        menu={{ items: dropdownItems, onClick: handleCopyToClipboard }}
        icon={<DownOutlined />}
        loading={state.ctcLoading}
        disabled={state.ctcLoading}
      >
        <Button>
          <Space>
            Copy To Clipboard
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Dropdown
        menu={{ items: dropdownItems, onClick: handleLoadRandomizeDialog }}
        icon={<DownOutlined />}
        loading={state.returnLoading}
        disabled={state.returnLoading}
      >
        <Button>
          <Space>
            Return Random Users From...
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Modal
        title={`Return Random Users From - ${state.randomUserKey}`}
        open={state.loadRandomizeModal}
        onOk={handleCloseRandomizeDialog}
        okText='Close'
        cancelText='Copy Users To Clipboard'
        closable={false}
        maskClosable={false}
        keyboard={false}
        okButtonProps={{
          disabled: state.randomizeInProgress
        }}
        cancelButtonProps={{
          disabled: !state.randomUsers || state.randomizeInProgress,
          style: { color: 'orange' }
        }}
      >
        <RandomizeDialogContent
          copyToClipboard={copyToClipboard}
          setRandomizeState={setRandomizeState}
          randomUserKey={state.randomUserKey}
        />
      </Modal>
    </Card>
  )
}

export default QuickActionsCard

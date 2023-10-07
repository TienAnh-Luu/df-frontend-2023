'use client'

import Link from 'next/link'
import { Typography, Space } from 'antd'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useTheme } from './_context/ThemeContext'

const { Title, Text } = Typography

export default function ErrorPage() {
  const { isDarkMode } = useTheme()

  return (
    <Space
      direction="vertical"
      align="center"
      style={{
        width: '100%',
        minHeight: 'calc(100vh - 45.09px)',
        paddingTop: '6rem',
        backgroundColor: isDarkMode ? 'rgb(36,37,38)' : 'white',
      }}
    >
      <Title level={1} style={{ marginBottom: '10px' }}>
        404
      </Title>
      <Text style={{ fontSize: '16px' }}>Page not found</Text>
      <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <AiOutlineArrowLeft style={{ marginRight: '4px' }} /> Go back to home
        page
      </Link>
    </Space>
  )
}

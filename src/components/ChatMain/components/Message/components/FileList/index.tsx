import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'reactstrap'
import { downloadFile } from '../../../../helpers'
import { FileListProps } from './types'

export function FileList({ file }: FileListProps) {
  return (
    <React.Fragment>
      <Card style={{ background: '#D3FFC8', margin: '0' }}>
        <div className="d-flex">
          <div className="avatar-sm me-3 ms-0">
            <div className="avatar-title bg-primary-subtle text-primary rounded font-size-20">
              <i className="ri-file-text-fill"></i>
            </div>
          </div>

          <div className="flex-grow-1">
            <div className="text-start">
              <h5 className="font-size-14 mb-1">{file.name}</h5>

              <p className="text-muted font-size-13 mb-0">{file.size}</p>
            </div>
          </div>

          <div className="ms-4">
            <ul className="list-inline mb-0 font-size-20">
              <li className="list-inline-item">
                <Link
                  to="#"
                  className="text-muted"
                  onClick={async () => await downloadFile(file)}
                >
                  <i className="ri-download-2-line"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </React.Fragment>
  )
}

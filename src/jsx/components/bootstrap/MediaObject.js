import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import PageTitle from '../../layouts/PageTitle'

import avatar1 from '../../../images/avatar/1.jpg'
import avatar2 from '../../../images/avatar/2.jpg'
import avatar3 from '../../../images/avatar/3.jpg'
import avatar4 from '../../../images/avatar/4.jpg'
import avatar5 from '../../../images/avatar/5.jpg'
import avatar6 from '../../../images/avatar/6.jpg'
import avatar7 from '../../../images/avatar/7.jpg'
import avatar8 from '../../../images/avatar/8.jpg'

import { Row, Col, Card, Image } from 'react-bootstrap'

const UiMediaObject = () => {
  const heading = 'Media heading'
  const text =
    'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.'
  const text2 =
    ' Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.'
  const text3 =
    'Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'

  return (
    <Fragment>
      <PageTitle activeMenu='Media Object' motherMenu='Bootstrap' />
      <Row>
        <Col xl='6' lg='12'>
          <Card>
            <Card.Header>
              <Card.Title>Media Object</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='bootstrap-media'>
                <Row className="mb-3">
                  <Col xs='auto'>
                    <Image
                      className='me-3 img-fluid'
                      width='60'
                      src={avatar1}
                      alt='DexignZone'
                    />
                  </Col>
                  <Col>
                    <h5 className='mt-0'>{heading}</h5>
                    <p className='mb-0'>{text}</p>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs='auto'>
                    <Image
                      className='me-3 img-fluid'
                      width='60'
                      src={avatar7}
                      alt='DexignZone'
                    />
                  </Col>
                  <Col>
                    <h5 className='mt-0'>{heading}</h5>
                    <p className='mb-0'>{text}</p>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl='6' lg='12'>
          <Card>
            <Card.Header>
              <Card.Title>Nesting</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='bootstrap-media'>
                <Row className="mb-3">
                  <Col xs='auto'>
                    <Image
                      className='me-3'
                      width='60'
                      src={avatar2}
                      alt='DexignZone'
                    />
                  </Col>
                  <Col>
                    <h5 className='mt-0'>{heading}</h5>
                    <p className='mb-0'>{text}</p>
                    <Row className="mt-4">
                      <Col xs='auto'>
                        <Link to={"#"} className='pe-3'>
                          <Image
                            width='60'
                            src={avatar3}
                            alt='DexignZone'
                          />
                        </Link>
                      </Col>
                      <Col>
                        <h5 className='mt-0'>{heading}</h5>
                        <p className='mb-0'>{text}</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Repeat similar structure for other sections as needed */}
      {/* Align Top, Center, Bottom, Order, and Media list */}
      
    </Fragment>
  )
}

export default UiMediaObject

import defaults from 'lodash/defaults'
import { getRepository } from 'typeorm'
import { Request, Response, Router } from 'express'

export const createController = (entity: any) => {
  const repository = getRepository(entity)

  const create = async (req: Request, res: Response) => {
    try {
      const record = await repository.save(req.body)
      return res.json(record)
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  const update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      if (!id) {
        return res
          .status(400)
          .json({ message: 'id is required for this action' })
      }
      const { id: _, ...body } = req.body
      const updateResult = await repository.update(id, body)
      return res.json(updateResult)
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  const findAll = async (req: Request, res: Response) => {
    try {
      const records = await repository.find()
      return res.json({ records })
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  const findById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      if (!id) {
        return res
          .status(400)
          .json({ message: 'id is required for this action' })
      }
      const record = await repository.findOneOrFail(id)
      return res.json({ record })
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  const destroy = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      if (!id) {
        return res
          .status(400)
          .json({ message: 'id is required for this action' })
      }
      const deleteResult = await repository.delete(id)
      return res.json(deleteResult)
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  const _formatOrder = (order: string | null) => {
    if (order === null) {
      return order
    }
    const [prop, type = 'asc'] = order.split(',')
    return {
      [prop]: type.toUpperCase()
    }
  }

  const findPage = async (req: Request, res: Response) => {
    try {
      const DEAFULT_QUERY = { page: 0, size: 10, order: null }
      const { page, size, order, ...where } = defaults(
        { ...req.query },
        DEAFULT_QUERY
      )
      const count = await repository.count()
      const records = await repository.find({
        order: _formatOrder(order),
        skip: page * size,
        take: size,
        where
      })
      return res.json({ records, totalElements: count, page, size })
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  return {
    create,
    update,
    findAll,
    findById,
    findPage,
    destroy
  }
}

export const createRouter = (
  baseUrl: string,
  controller: ReturnType<typeof createController>
) => {
  const router = Router()

  router
    .route(baseUrl)
    .get(controller.findPage)
    .post(controller.create)

  router.get(`${baseUrl}/findAll`, controller.findAll)

  router
    .route(`${baseUrl}/:id`)
    .get(controller.findById)
    .put(controller.update)
    .delete(controller.destroy)

  return router
}

export const createEntityRouter = (baseUrl: string, entity: any) =>
  createRouter(baseUrl, createController(entity))

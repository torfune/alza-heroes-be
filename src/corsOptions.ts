const corsOptions = {
  origin: (origin: string, cb: Function) => {
    if (
      !origin ||
      /localhost/.test(origin) ||
      /alza-heroes.now.sh/.test(origin)
    ) {
      cb(null, true)
      return
    }
    cb(new Error('Not allowed'), false)
  },
}

export default corsOptions
